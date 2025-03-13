declare module 'prismjs' {
  const Prism: {
    highlightAll: () => void;
    highlight: (code: string, grammar: any, language: string) => string;
    languages: Record<string, any>;
    tokenize: (code: string, grammar: any) => any[];
  };
  export default Prism;
} 
