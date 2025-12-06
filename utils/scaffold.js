export async function fetchButtonData() {
  try {
    const response = await fetch('https://rentry.co/hoduy_hdytclip2', {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const element = doc.querySelector('.clippy');
    if (element) {
      const value = element.getAttribute('value');
      const array = value.split('\n');
      return array;
    }
  } catch (error) {
    console.error('Error fetching webpage:', error);
    return [];
  }
}