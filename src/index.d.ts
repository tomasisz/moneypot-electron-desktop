declare module '*.png';

declare module '*.html' {
    const content: string;
    export default content;
  }

declare module 'mousetrap';

// useless.