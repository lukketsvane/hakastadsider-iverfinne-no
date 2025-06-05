import os
from pathlib import Path

PROJECT_ROOT_DIR = Path(".")
OUTPUT_MARKDOWN_FILE = Path("code-content.md")
TRANSCRIPTION_MODE = "explicit"
EXPLICIT_FILES_TO_INCLUDE = [
    "app/page.tsx",
    "app/layout.tsx",
    "components/split-scroll.tsx",
]
PATTERN_MODE_INCLUDES = ["*.tsx"]
PATTERN_MODE_EXCLUDE_PREFIXES = ["components/ui/"]

def transcribe_files():
    absolute_project_root = PROJECT_ROOT_DIR.resolve()
    files_to_transcribe = []
    processed_explicit_files = []
    output_lines = []

    if not absolute_project_root.is_dir():
        error_msg = f"Error: Project root directory not found: {absolute_project_root}"
        print(error_msg)
        with OUTPUT_MARKDOWN_FILE.open("w", encoding="utf-8") as md_file:
            md_file.write(f"# Code Content Overview\n\n**{error_msg}**\n")
        print(f"Error overview written to {OUTPUT_MARKDOWN_FILE.resolve()}")
        return

    if TRANSCRIPTION_MODE == "explicit":
        print(f"Mode: explicit. Transcribing files from EXPLICIT_FILES_TO_INCLUDE list.")
        for rel_path_str in EXPLICIT_FILES_TO_INCLUDE:
            file_path = absolute_project_root / rel_path_str
            processed_explicit_files.append(rel_path_str)
            if file_path.is_file() and file_path.suffix.lower() == ".tsx":
                files_to_transcribe.append(file_path)
            else:
                status = "not a .tsx file" if file_path.is_file() else "not found"
                print(f"Warning: Explicit file '{rel_path_str}' {status} at '{file_path}'. Skipping.")
    
    elif TRANSCRIPTION_MODE == "patterns":
        print(f"Mode: patterns. Searching for files.")
        for pattern in PATTERN_MODE_INCLUDES:
            for file_path in absolute_project_root.rglob(pattern):
                if not file_path.is_file(): continue
                relative_path = file_path.relative_to(absolute_project_root)
                relative_path_str_posix = relative_path.as_posix()
                is_excluded = False
                if file_path.suffix.lower() == '.tsx':
                    for prefix in PATTERN_MODE_EXCLUDE_PREFIXES:
                        if relative_path_str_posix.startswith(prefix):
                            is_excluded = True; break
                if not is_excluded: files_to_transcribe.append(file_path)
    else:
        error_msg = f"Error: Unknown TRANSCRIPTION_MODE '{TRANSCRIPTION_MODE}'. Use 'explicit' or 'patterns'."
        print(error_msg)
        with OUTPUT_MARKDOWN_FILE.open("w", encoding="utf-8") as md_file:
            md_file.write(f"# Code Content Overview\n\n**{error_msg}**\n")
        return

    files_to_transcribe.sort()

    output_lines.append("# Code Content Overview\n")
    output_lines.append(f"Source Project Directory: `{absolute_project_root.as_posix()}`")
    output_lines.append(f"Transcription Mode: `{TRANSCRIPTION_MODE}`")

    if TRANSCRIPTION_MODE == "explicit":
        output_lines.append("Requested explicit files:")
        for f_path in processed_explicit_files:
            status = "Found and included" if (absolute_project_root / f_path) in files_to_transcribe else "Not found or skipped"
            output_lines.append(f"- `{f_path}` ({status})")
    elif TRANSCRIPTION_MODE == "patterns":
        output_lines.append(f"Included file patterns: `{', '.join(PATTERN_MODE_INCLUDES)}`")
        if PATTERN_MODE_EXCLUDE_PREFIXES:
            output_lines.append(f"TSX Exclude Prefixes: `{', '.join(PATTERN_MODE_EXCLUDE_PREFIXES)}`")
    output_lines.append("\n---\n")

    if not files_to_transcribe:
        print("No files found matching the criteria to transcribe.")
        output_lines.append("**No files were found matching the specified criteria for transcription.**")
    else:
        print(f"Found {len(files_to_transcribe)} files to transcribe.")
        for file_path in files_to_transcribe:
            relative_path = file_path.relative_to(absolute_project_root)
            display_path = relative_path.as_posix()
            output_lines.append(f"## `{display_path}`\n")
            try:
                content = file_path.read_text(encoding="utf-8")
                sfx = file_path.suffix[1:].lower() if file_path.suffix else ""
                lang = "typescript" if sfx in ["tsx", "ts"] else "javascript" if sfx in ["mjs", "js"] else sfx if sfx else "text"
                output_lines.append(f"```{lang}\n{content.strip()}\n```\n\n---")
            except Exception as e:
                output_lines.append(f"```text\nError reading file: {e}\n```\n\n---")
                print(f"  Error reading {display_path}: {e}")
    
    with OUTPUT_MARKDOWN_FILE.open("w", encoding="utf-8") as md_file:
        md_file.write("\n".join(output_lines) + "\n")

    print(f"\nTranscription complete. Output written to {OUTPUT_MARKDOWN_FILE.resolve()}")
    if files_to_transcribe:
        print(f"Included {len(files_to_transcribe)} files.")

if __name__ == "__main__":
    transcribe_files()