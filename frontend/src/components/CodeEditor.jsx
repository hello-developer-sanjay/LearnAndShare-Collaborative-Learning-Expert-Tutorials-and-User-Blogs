import React, { useState, useRef, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { markdown } from '@codemirror/lang-markdown';
import { toPng, toJpeg } from 'html-to-image';
import download from 'downloadjs';
import { history, undo, redo } from '@codemirror/commands';
import { keymap } from '@codemirror/view';
import { autocompletion } from '@codemirror/autocomplete';
import { oneDark } from '@codemirror/theme-one-dark';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { darcula } from '@uiw/codemirror-theme-darcula';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { motion } from 'framer-motion';
import '../styles/CodeEditor.css';
import { Helmet } from 'react-helmet';

const themes = {
  oneDark: {
    theme: oneDark,
    backgroundColor: '#282c34'
  },
  dracula: {
    theme: dracula,
    backgroundColor: '#282a36'
  },
  darcula: {
    theme: darcula,
    backgroundColor: '#2b2b2b'
  },
  okaidia: {
    theme: okaidia,
    backgroundColor: '#272822'
  }
};

const CodeEditor = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [theme, setTheme] = useState('oneDark');
  const [fontSize, setFontSize] = useState(14);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [windows, setWindows] = useState([{ id: 1, code: '' }]);
  const [syntaxHighlighting, setSyntaxHighlighting] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [lineWrapping, setLineWrapping] = useState(true);
  const [livePreview, setLivePreview] = useState(false);
  const codeRef = useRef(null);

  useEffect(() => {
    if (autoSave) {
      const timeoutId = setTimeout(() => {
        localStorage.setItem('savedCode', code);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [code, autoSave]);

  const updateCounts = (text) => {
    const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
    const characterCount = text.length;
    return { wordCount, characterCount };
  };

  const getLanguageExtension = (lang) => {
    switch (lang) {
      case 'javascript':
        return javascript();
      case 'python':
        return python();
      case 'css':
        return css();
      case 'html':
        return html();
      case 'markdown':
        return markdown();
      default:
        return javascript();
    }
  };

  const getTheme = (theme) => {
    return themes[theme].theme;
  };

  const handleDownload = (format) => {
    const element = codeRef.current;

    if (format === 'png') {
      toPng(element)
        .then((dataUrl) => {
          download(dataUrl, 'code.png');
        })
        .catch((error) => {
          console.error('oops, something went wrong!', error);
        });
    } else if (format === 'jpeg') {
      toJpeg(element)
        .then((dataUrl) => {
          download(dataUrl, 'code.jpeg');
        })
        .catch((error) => {
          console.error('oops, something went wrong!', error);
        });
    }
  };

  const handleDownloadTextFile = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    download(blob, 'code.txt');
  };

  const addNewWindow = () => {
    setWindows([...windows, { id: windows.length + 1, code: '', wordCount: 0, characterCount: 0 }]);
  };

  const closeWindow = (id) => {
    setWindows(windows.filter((win) => win.id !== id));
  };

  const updateWindowCode = (id, newCode) => {
    const updatedWindows = windows.map((win) => {
      if (win.id === id) {
        const counts = updateCounts(newCode);
        return { ...win, code: newCode, ...counts };
      }
      return win;
    });
    setWindows(updatedWindows);
    setCode(newCode);
  };

  const toggleSyntaxHighlighting = () => {
    setSyntaxHighlighting(!syntaxHighlighting);
  };

  const toggleLineWrapping = () => {
    setLineWrapping(!lineWrapping);
  };

  return (
    <><Helmet>
    <title>Code Editor - Customize and Download Your Code</title>
    <meta name="description" content="Experience a powerful code editor with syntax highlighting, multiple themes, and download options. Perfect for developers and coding enthusiasts." />
    <meta name="keywords" content="code editor, syntax highlighting, code download, code themes, JavaScript, Python, CSS, HTML, Markdown" />
    
    <meta property="og:title" content="Code Editor - Customize and Download Your Code" />
    <meta property="og:description" content="Experience a powerful code editor with syntax highlighting, multiple themes, and download options. Perfect for developers and coding enthusiasts." />
    <meta property="og:image" content="https://sanjaybasket.s3.ap-south-1.amazonaws.com/HogwartsEdX/code-image.webp" />
    <meta property="og:url" content="https://hogwartsedx.vercel.app/editor" />
    <meta property="og:type" content="website" />
  
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Code Editor - Customize and Download Your Code" />
    <meta name="twitter:description" content="Experience a powerful code editor with syntax highlighting, multiple themes, and download options. Perfect for developers and coding enthusiasts." />
    <meta name="twitter:image" content="https://sanjaybasket.s3.ap-south-1.amazonaws.com/HogwartsEdX/code-image.webp" />
  </Helmet>
  
  
    <motion.div
      className={`containereditor ${theme}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundColor: themes[theme].backgroundColor }}
    >
      <motion.div
        className="toolbar"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120 }}
      >
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="css">CSS</option>
          <option value="html">HTML</option>
          <option value="markdown">Markdown</option>
        </select>
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="oneDark">One Dark</option>
          <option value="dracula">Dracula</option>
          <option value="darcula">Darcula</option>
          <option value="okaidia">Okaidia</option>
        </select>
        <select value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))}>
          <option value={12}>12px</option>
          <option value={14}>14px</option>
          <option value={16}>16px</option>
          <option value={18}>18px</option>
          <option value={20}>20px</option>
        </select>
        <label>
          <input type="checkbox" checked={showLineNumbers} onChange={(e) => setShowLineNumbers(e.target.checked)} />
          Show Line Numbers
        </label>
        <label>
          <input type="checkbox" checked={syntaxHighlighting} onChange={toggleSyntaxHighlighting} />
          Syntax Highlighting
        </label>
        <label>
          <input type="checkbox" checked={lineWrapping} onChange={toggleLineWrapping} />
          Line Wrapping
        </label>
        <label>
          <input type="checkbox" checked={autoSave} onChange={(e) => setAutoSave(e.target.checked)} />
          Auto Save
        </label>
      </motion.div>
     <div className="buttonz-container">
          <button className="buttonz" onClick={() => handleDownload('png')}>Download as PNG</button>
          <button className="buttonz" onClick={() => handleDownload('jpeg')}>Download as JPEG</button>
          <button className="buttonz" onClick={handleDownloadTextFile}>Download as Text</button>
          <button className="buttonz" onClick={addNewWindow}>New Window</button>
        </div>
      <div className="code-windows">
        {windows.map((window) => (
          <motion.div
            key={window.id}
            ref={codeRef}
            className="code-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="status-bar">
              <span>Words: {window.wordCount}</span> <br />
              <span>Characters: {window.characterCount}</span>
            </div>
            <button className="close-button" onClick={() => closeWindow(window.id)}>Close</button>
            <CodeMirror
              value={window.code}
              height="auto"
              extensions={[
                syntaxHighlighting ? getLanguageExtension(language) : [],
                getTheme(theme),
                history(),
                keymap.of([
                  { key: 'Mod-z', run: undo },
                  { key: 'Mod-y', run: redo },
                ]),
                autocompletion(),
              ]}
              onChange={(value) => updateWindowCode(window.id, value)}
              className={`code-editor ${theme}`}
              style={{ fontSize: `${fontSize}px` }}
              basicSetup={{
                lineNumbers: showLineNumbers,
                foldGutter: true,
                highlightActiveLineGutter: true,
                highlightSpecialChars: true,
                history: true,
                drawSelection: true,
                dropCursor: true,
                allowMultipleSelections: true,
                indentOnInput: true,
                bracketMatching: true,
                closeBrackets: true,
                autocompletion: true,
                syntaxHighlighting: syntaxHighlighting,
                lineWrapping: lineWrapping,
              }}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
    </>
  );
};

export default CodeEditor;
