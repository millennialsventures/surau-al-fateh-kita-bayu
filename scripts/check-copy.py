#!/usr/bin/env python3
"""Guard against mangled Bahasa Malaysia copy.

Three checks, run over every .ts / .tsx / .css file in src/:

1. Banned scripts (CJK, Cyrillic, Hangul, Hebrew, Arabic, Kana). None of these
   legitimately appear on this site.
2. Words that glue together characters from two different scripts with no
   whitespace boundary — a reliable signal of injected garbage tokens.
3. A short, specific list of Latin tokens that have actually appeared as
   corruption artefacts in this codebase's Malay copy. The list is kept tight
   so ordinary TypeScript identifiers do not trigger it.

Run: python3 scripts/check-copy.py
"""
import pathlib
import re
import sys
import unicodedata

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "src"
SUFFIXES = {".ts", ".tsx", ".css"}

# Also scan the README and the docs/ handoffs: those are the files
# contributors read first, so a mangled sentence there is just as damaging as
# one in a component.
EXTRA_FILES = [ROOT / "README.md", *sorted((ROOT / "docs").glob("*.md"))]

BANNED_RANGES = [
    (0x2E80, 0x9FFF),   # CJK radicals .. unified ideographs
    (0xAC00, 0xD7AF),   # Hangul
    (0x0400, 0x04FF),   # Cyrillic
    (0x0590, 0x05FF),   # Hebrew
    (0x0600, 0x06FF),   # Arabic
    (0x3040, 0x30FF),   # Kana
]

# Corruption artefacts actually observed in this project's copy.
ARTEFACTS = {
    "valle", "mdzf", "relentlessly", "visitors", "occupying", "financial",
    "framework", "pzxo", "implicated", "acquaintance", "lobbied", "until",
    "vault", "media", "governance", "asap", "leverage", "seamless", "robust",
    "delve", "paradigm", "synergy", "holistic", "align", "empower", "elevate",
    "showcase", "curate", "spearhead", "harness", "pivotal", "tangible",
    "requisite", "aforementioned", "commence", "endeavour", "utilise",
    "kebyte", "activatoriti", "residents", "manifested", "ptable",
    "preliminaresariat", "getting", "touch", "vijazah", "palmer", "certain",
}

# Legitimate in this codebase despite looking code-like.
ALLOWED = {
    "todo", "surau", "al", "fateh", "kita", "bayu", "cyberjaya", "media",
    "align", "until", "visitors", "framework", "map", "filter", "const",
    "let", "var", "function", "return", "string", "number", "boolean",
    "object", "array", "null", "undefined", "true", "false", "import",
    "export", "default", "type", "interface", "class", "extends", "await",
    "async", "next", "react", "metadata", "params", "props", "children",
    "href", "src", "alt", "key", "id", "name", "value", "label", "title",
    "date", "time", "size", "color", "class", "style", "http", "https",
    "www", "com", "png", "jpg", "svg", "json", "xml", "use", "set", "get",
    "post", "put", "table", "slice", "shift", "push", "pop", "concat",
    "parse", "stringify", "reduce", "flatten", "keys", "entries", "values",
    "includes", "startswith", "endswith", "join", "split", "match", "test",
    "replace", "trim", "toString", "typeof", "instanceof", "this", "super",
    "static", "public", "private", "protected", "readonly", "declare",
    "namespace", "module", "require", "exports", "process", "global",
    "console", "window", "document", "Math", "Date", "Intl", "JSON",
    "Number", "String", "Object", "Array", "Boolean", "Promise", "Record",
    "Partial", "Readonly", "Required", "Pick", "Omit", "Exclude", "Awaited",
    "unknown", "never", "any", "void", "enum", "namespace",
}


def has_banned(ch: str) -> bool:
    cp = ord(ch)
    return any(lo <= cp <= hi for lo, hi in BANNED_RANGES)


def mixed_script_words(line: str) -> list[str]:
    found = []
    for word in re.findall(r"[^\W\d_]+", line, flags=re.UNICODE):
        scripts: set[str] = set()
        for ch in word:
            if has_banned(ch):
                scripts.add("BANNED")
                continue
            try:
                scripts.add(unicodedata.name(ch).split()[0])
            except ValueError:
                continue
        if len(scripts) > 1:
            found.append(word)
    return found


def scan(path: pathlib.Path) -> list[str]:
    rel = path.relative_to(ROOT)
    problems: list[str] = []

    for lineno, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
        for ch in line:
            if has_banned(ch):
                problems.append(
                    f"{rel}:{lineno} banned char {ch!r} (U+{ord(ch):04X})"
                )
                break

        for word in mixed_script_words(line):
            problems.append(f"{rel}:{lineno} mixed-script word {word!r}")

        for word in re.findall(r"[A-Za-z]+", line):
            low = word.lower()
            if low in ARTEFACTS and low not in ALLOWED:
                problems.append(f"{rel}:{lineno} artefact {word!r}")

    return problems


def main() -> int:
    files = [
        p for p in sorted(SRC.rglob("*"))
        if p.is_file() and p.suffix in SUFFIXES
    ]
    files += [p for p in EXTRA_FILES if p.is_file()]

    problems: list[str] = []
    for path in files:
        problems.extend(scan(path))

    if problems:
        print(f"FAIL — {len(problems)} problem(s) found:\n")
        for p in sorted(set(problems)):
            print(f"  {p}")
        return 1

    print(f"OK — {len(files)} source files clean of mangled copy.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
