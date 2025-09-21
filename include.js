// Simple include loader for header/footer (works when served over HTTP/HTTPS)
document.addEventListener('DOMContentLoaded', () => {
  const includeTargets = document.querySelectorAll('[data-include]');
  includeTargets.forEach(async (el) => {
    const url = el.getAttribute('data-include');
    try{
      const res = await fetch(url);
      const html = await res.text();
      el.outerHTML = html;
    }catch(err){
      console.error('Include error:', url, err);
    }
  });
});
