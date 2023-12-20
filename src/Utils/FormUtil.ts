/**
 * Serialize a form into an object
 * @param form The form to serialize
 * @returns An object of type T from the form
 */
export function serializeForm<T extends object>(form: HTMLFormElement, log = false) {
  const children = Array.from(form.children);
  const formData = children.reduce((acc, child) => {
    // Find inputs and selects
    const elements = Array.from(child.querySelectorAll('input, select') as NodeListOf<HTMLInputElement | HTMLSelectElement>);
    if (['INPUT', 'SELECT'].includes(child.tagName)) elements.push(child as HTMLInputElement | HTMLSelectElement);

    for (const element of Array.from(elements)) {
      if (element.type === 'submit') continue; // Ignore submit buttons

      const name = element.getAttribute('name');
      if (!name) {
        console.error('[DanhoLibraryRJS] [FormUtil]: name attribute is required', { element });
        throw new Error('name attribute is required');
      }

      const value = element.value;
      if (value === null) console.warn(`${name}.value returned null`, { element });

      if (log) console.log(`[DanhoLibraryRJS] [FormUtil]`, { name, value });
      acc[name] = /^\d$/.test(value) ? parseInt(value) : value;
    }

    return acc;
  }, {} as Record<string, any>) as T;

  return formData;
}