declare module '*.module.css';
declare module '*.module.scss';
declare module 'moment/*';
declare module 'react-avatar-editor';
declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
declare namespace _ {}
declare module '@emotion/babel-plugin';
declare module 'emoji-mart';
