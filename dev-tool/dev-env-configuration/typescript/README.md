# typescript

타입스크립트


### CompilerOption

컴파일 할때 설정할 수 있는 내용들을 정의한다.
tsconfig.js 파일내부 compilerOption안에 정의할 수 있다.

```JSON
{
  "compilerOptions": {

    /* Basic Options */                       
    "target": "es5",                       /* ECMAScript 타겟 버전을 명시한다: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'. */
    "module": "commonjs",                  /* 모듈 코드 생성을 명시한다: 'commonjs', 'amd', 'system', 'umd' or 'es2015'. */
    "lib": [],                             /* 컴파일시 포함하는 라이브러리를 명시한다:  */
    "allowJs": true,                       /* 컴파일시 자바스크립트 파일 허용 */
    "checkJs": true,                       /* Report errors in .js files. */
    "jsx": "preserve",                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
    "declaration": true,                   /* Generates corresponding '.d.ts' file. */
    "sourceMap": true,                     /* Generates corresponding '.map' file. */
    "outFile": "./",                       /* Concatenate and emit output to single file. */
    "outDir": "./",                        /* Redirect output structure to the directory. */
    "rootDir": "./",                       /* input 파일의 루트 디렉토리를 명시한다. Use to control the output directory structure with --outDir. */
    "removeComments": true,                /* 주석을 지울지 결정 */
    "noEmit": true,                        /* Do not emit outputs. */
    "importHelpers": true,                 /* Import emit helpers from 'tslib'. */
    "downlevelIteration": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
    "isolatedModules": true,               /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */

    /* Strict Type-Checking Options */        
    "strict": true,                        /* 강력한 타입 체킹을 허용 */
    "noImplicitAny": true,                 /* any 타입에 대한 오류를 허용 */
    "strictNullChecks": true,              /* null 값에 대한 체킹을 허용 */
    "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
    "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */

    /* Additional Checks */                   
    "noUnusedLocals": true,                /* 사용하지 않는 지역변수에 대한 체크 */
    "noUnusedParameters": true,            /* 사용하지 않는 파라미터(인자)에 대한 체크 */
    "noImplicitReturns": true,             /* Report error when not all code paths in function return a value. */
    "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. */

    /* Module Resolution Options */           
    "moduleResolution": "node",            /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
    "baseUrl": "./",                       /* 상대 경로 모듈에 대한 base 주소 */
    "paths": {},                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
    "rootDirs": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. */
    "typeRoots": [],                       /* List of folders to include type definitions from. */
    "types": [],                           /* Type declaration files to be included in compilation. */
    "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */

    /* Source Map Options */                  
    "sourceRoot": "./",                    /* Specify the location where debugger should locate TypeScript files instead of source locations. */
    "mapRoot": "./",                       /* Specify the location where debugger should locate map files instead of generated locations. */
    "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. */
    "inlineSources": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */

    /* Experimental Options */                
    "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. */
    "emitDecoratorMetadata": true          /* Enables experimental support for emitting type metadata for decorators. */
  }
}
```