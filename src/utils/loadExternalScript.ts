export const loadExternalScript = (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // 如果已載入過就不重複載入
    if (document.querySelector(`script[src="${url}"]`)) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src = url
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`Failed to load script: ${url}`))
    document.body.appendChild(script)
  })
}