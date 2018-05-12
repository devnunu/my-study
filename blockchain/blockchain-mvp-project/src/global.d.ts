declare var require: any;

declare module '*.css' {
  const classes: { [index: string]: string };
  export default classes;
}

declare module '*.scss' {
  const classes: { [index: string]: string };
  export default classes;
}
