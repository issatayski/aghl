// Simple include loader for header/footer with completion event
document.addEventListener('DOMContentLoaded', async () => {
  const includeTargets = Array.from(document.querySelectorAll('[data-include]'));
  await Promise.all(includeTargets.map(async (el) => {
    const url = el.getAttribute('data-include');
    try{
      const res = await fetch(url);
      const html = await res.text();
      el.outerHTML = html;
    }catch(err){
      console.error('Include error:', url, err);
    }
  }));
  document.dispatchEvent(new CustomEvent('includes:loaded'));
});
