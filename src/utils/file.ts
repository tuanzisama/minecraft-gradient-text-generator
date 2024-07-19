export function saveAs(blob: Blob, fileName: string): Promise<void> {
  return new Promise((resolve) => {
    const downloadUrl = window.URL.createObjectURL(blob);
    const linkEl = document.createElement("a");
    linkEl.setAttribute("href", downloadUrl);
    linkEl.setAttribute("download", fileName);
    linkEl.click();
    window.URL.revokeObjectURL(downloadUrl);
    resolve();
  });
}
