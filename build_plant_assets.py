#!/usr/bin/env python3
"""
Fieldnote plant asset pipeline.

  python build_plant_assets.py prompts   -> writes prompts.txt (one line per image to generate)
  python build_plant_assets.py process   -> turns raw/*.png into assets/plants/<icon>/<stage>-<n>.webp
                                            and prints the plantAssets manifest for app.js

Install once:
  pip install "rembg[cpu,cli]" pillow numpy
"""
import re
import sys
from collections import defaultdict
from pathlib import Path

RAW = Path("raw")
OUT = Path("assets/plants")
VARIANTS = 2                      # images per species per stage
STAGES = ["young", "mid", "mature"]
TARGET_HEIGHT = 1200              # px, tall enough for the 2400px export

BASE = (
    "{subject}, isolated on a plain pure white background, entire plant visible from "
    "the base to the top, no pot, no soil mound, no ground, no shadow, no text, "
    "side view with the camera at plant height, soft even natural daylight, "
    "realistic botanical photograph, sharp detail"
)

# icon -> (display name, {stage: description})
SPECIES = {
    "berry": ("serviceberry (Amelanchier)", {
        "young": "a first-year serviceberry sapling about 2 feet tall, a few thin branches, sparse small leaves",
        "mid": "a 3-year-old serviceberry shrub about 4 feet tall, several stems, moderate leaf cover",
        "mature": "a mature multi-stem serviceberry shrub, dense foliage, with ripe dark purple berries",
    }),
    "strawberry": ("wild strawberry (Fragaria virginiana)", {
        "young": "two or three small wild strawberry plants with a few leaves each",
        "mid": "a small clump of wild strawberry with runners spreading, leafy",
        "mature": "a dense patch of wild strawberry with white flowers and ripe red berries",
    }),
    "blueberry": ("highbush blueberry (Vaccinium)", {
        "young": "a young blueberry plant about 1.5 feet tall with a few upright stems",
        "mid": "a 3-year-old blueberry bush about 3 feet tall, branching, leafy",
        "mature": "a mature blueberry shrub about 5 feet tall, full and rounded, with ripe blue berries",
    }),
    "coneflower": ("purple coneflower (Echinacea purpurea)", {
        "young": "a young purple coneflower plant, a low rosette of leaves with one short stem and no flowers",
        "mid": "a purple coneflower plant with several stems and a couple of buds beginning to open",
        "mature": "a mature purple coneflower plant about 4 feet tall in full bloom with many pink-purple flowers",
    }),
    "susan": ("black-eyed Susan (Rudbeckia hirta)", {
        "young": "a young black-eyed Susan plant, a small leafy rosette with a short stem, no flowers",
        "mid": "a black-eyed Susan plant with several stems and a few buds",
        "mature": "a mature black-eyed Susan plant about 2.5 feet tall covered in golden flowers with dark centers",
    }),
    "bergamot": ("wild bergamot (Monarda fistulosa)", {
        "young": "a young wild bergamot plant, a few upright leafy stems about 1 foot tall, no flowers",
        "mid": "a wild bergamot plant about 2.5 feet tall, leafy with flower buds forming",
        "mature": "a mature wild bergamot plant about 4 feet tall in full bloom with lavender flower heads",
    }),
    "inkberry": ("inkberry holly (Ilex glabra)", {
        "young": "a young inkberry holly about 1.5 feet tall, sparse glossy dark green leaves",
        "mid": "an inkberry holly shrub about 3.5 feet tall, fairly dense, glossy evergreen leaves",
        "mature": "a mature inkberry holly about 6 feet tall, dense rounded evergreen shrub with a few black berries",
    }),
    "cedar": ("eastern red cedar (Juniperus virginiana)", {
        "young": "a young eastern red cedar sapling about 3 feet tall, narrow cone shape, sparse foliage",
        "mid": "an eastern red cedar about 7 feet tall, narrow conical evergreen tree",
        "mature": "a mature eastern red cedar about 14 feet tall, dense conical evergreen tree with blue-green foliage",
    }),
    "arborvitae": ("American arborvitae (Thuja occidentalis)", {
        "young": "a young American arborvitae about 2 feet tall, small narrow evergreen with soft flat foliage",
        "mid": "an American arborvitae about 6 feet tall, narrow dense evergreen",
        "mature": "a mature American arborvitae about 12 feet tall, tall dense narrow evergreen with flat green sprays",
    }),
}


def make_prompts():
    lines = []
    for icon, (_name, stages) in SPECIES.items():
        for stage in STAGES:
            for n in range(VARIANTS):
                filename = f"{icon}_{stage}_{n}"
                prompt = BASE.format(subject=stages[stage])
                lines.append(f"{filename}\t{prompt}")
    Path("prompts.txt").write_text("\n".join(lines) + "\n", encoding="utf-8")
    RAW.mkdir(exist_ok=True)
    print(f"Wrote prompts.txt ({len(lines)} prompts). Save each result in ./{RAW}/ using the name in column 1,")
    print("for example raw/coneflower_mature_0.png")


def process():
    import numpy as np
    from PIL import Image, ImageFilter
    from rembg import new_session, remove

    session = new_session("isnet-general-use")
    pattern = re.compile(r"^([a-z]+)_(young|mid|mature)_(\d+)\.(png|jpe?g|webp)$", re.I)
    counts = defaultdict(lambda: defaultdict(int))
    warnings = []

    files = sorted(RAW.iterdir()) if RAW.exists() else []
    if not files:
        sys.exit(f"No files found in ./{RAW}/. Run 'prompts' first and generate the images.")

    for f in files:
        m = pattern.match(f.name)
        if not m:
            print(f"skip (name doesn't match icon_stage_n.ext): {f.name}")
            continue
        icon, stage, n = m.group(1).lower(), m.group(2).lower(), int(m.group(3))
        if icon not in SPECIES:
            print(f"skip (unknown species '{icon}'): {f.name}")
            continue

        img = Image.open(f).convert("RGBA")
        cut = remove(
            img, session=session, alpha_matting=True,
            alpha_matting_foreground_threshold=240,
            alpha_matting_background_threshold=10,
            alpha_matting_erode_size=10,
        )

        # Pull the edge in by a pixel to remove light halos around leaves.
        r, g, b, a = cut.split()
        a = a.filter(ImageFilter.MinFilter(3))
        cut = Image.merge("RGBA", (r, g, b, a))

        # Trim to the plant.
        mask = a.point(lambda v: 255 if v > 20 else 0)
        bbox = mask.getbbox()
        if not bbox:
            warnings.append(f"{f.name}: nothing left after background removal")
            continue
        cut = cut.crop(bbox)
        alpha = np.array(cut.getchannel("A"))
        h, w = alpha.shape

        # Center the canvas on the plant's BASE (bottom 8% of rows), not its bounding box,
        # so the stem lands on the ground point even for leaning or asymmetric plants.
        band = alpha[int(h * 0.92):, :] > 20
        xs = np.where(band.any(axis=0))[0]
        base_x = float(xs.mean()) if len(xs) else w / 2
        half = int(max(base_x, w - base_x)) + 1
        canvas = Image.new("RGBA", (half * 2, h), (0, 0, 0, 0))
        canvas.paste(cut, (int(half - base_x), 0))

        # Resize to a consistent height.
        scale = TARGET_HEIGHT / h
        canvas = canvas.resize((max(1, int(canvas.width * scale)), TARGET_HEIGHT), Image.LANCZOS)

        if canvas.width / canvas.height > 1.6:
            warnings.append(f"{f.name}: very wide for its height; check it's one plant, not a patch or a scene")

        dest = OUT / icon
        dest.mkdir(parents=True, exist_ok=True)
        canvas.save(dest / f"{stage}-{n}.webp", "WEBP", quality=85, method=6)
        counts[icon][stage] = max(counts[icon][stage], n + 1)
        print(f"ok  {f.name} -> {dest / f'{stage}-{n}.webp'}")

    if warnings:
        print("\nCheck these by eye:")
        for w_ in warnings:
            print("  -", w_)

    print("\nPaste this into app.js, replacing the plantAssets object:\n")
    print("const plantAssets = {")
    for icon in SPECIES:
        if icon in counts:
            parts = ", ".join(f"{s}:{counts[icon][s]}" for s in STAGES if counts[icon][s])
            print(f"  {icon}:{{{parts}}},")
    print("};")


if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else ""
    if cmd == "prompts":
        make_prompts()
    elif cmd == "process":
        process()
    else:
        sys.exit("Usage: python build_plant_assets.py [prompts|process]")
