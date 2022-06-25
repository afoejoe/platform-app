export default function classNames(...classes: (false | null | undefined | string)[]) {
  return classes.filter(Boolean).join(' ');
}

export function elt(name: string, attrs: any, ...children: any[]) {
  const el = document.createElement(name);
  Object.entries(attrs).forEach(([key, value]) => {
    el.setAttribute(key, value as string);
  });

  children.forEach((child) => {
    el.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
  });

  return el;
}
