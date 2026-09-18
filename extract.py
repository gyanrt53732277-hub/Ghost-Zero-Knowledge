from pathlib import Path
import zipfile

artifact = Path(
    "/home/gyanrt53732277-hub/.compact/versions/0.31.1/"
    "x86_64-unknown-linux-musl/artifact.zip"
)

destination = artifact.parent

with zipfile.ZipFile(artifact) as archive:
    archive.extractall(destination)
