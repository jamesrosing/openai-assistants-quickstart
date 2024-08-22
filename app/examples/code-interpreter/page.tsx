'use client';

import React, { useState } from 'react';
import styles from '../shared/page.module.css';
import CodeInterpreter from '../../components/CodeInterpreter';
import { RequiredActionFunctionToolCall } from "openai/resources/beta/threads/runs/runs";

const CodeInterpreterExample = () => {
  const [codeResult, setCodeResult] = useState<string>('');

  const runCode = async (code: string): Promise<string> => {
    // Send the code to the backend API to execute
    try {
      const response = await fetch('/api/assistants/execute-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.result || 'No output';
    } catch (error) {
      return `Execution Error: ${error.message}`;
    }
  };

  const codeInterpreterHandler = async (code: string) => {
    const result = await runCode(code);
    setCodeResult(result);
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <CodeInterpreter onCodeSubmit={codeInterpreterHandler} />
        <div className={styles.result}>
          <pre>{codeResult}</pre>
        </div>
      </div>
    </main>
  );
};

export default CodeInterpreter;
