import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { PROBLEMS } from '../data/problems';
import Navbar from '../components/Navbar';
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"
import OutPutPanel from '../components/OutPutPanel';
import CodeEditor from '../components/CodeEditor';
import ProblemDescription from '../components/ProblemDescription';
import { executeCode } from '../lib/piston';
import toast from 'react-hot-toast';
import confetti from "canvas-confetti"

function ProblemPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentProblemId, setCurrentProblemId] = useState("two-sum");
    const [selectedLanguage, setSelectedLanguage] = useState("javascript");
    const [code, setCode] = useState(PROBLEMS[currentProblemId].starterCode.javascript);
    const [output, setOutPut] = useState(null)
    const [isRunning, setIsRunning] = useState(false);

    const currentProblem = PROBLEMS[currentProblemId]


    useEffect(() => {
        if (id && PROBLEMS[id]) {
            setCurrentProblemId(id);
            setCode(PROBLEMS[id].starterCode[selectedLanguage])
        }
        setOutPut(null)
    }, [id, selectedLanguage])

    const handledLanguageChange = (e) => { 
        const newLang = e.target.value;
        setSelectedLanguage(newLang);
        setCode(currentProblem.starterCode[newLang]);
        setOutPut(null);
    }

    const handleProblemChange = (newproblemId) => {
        navigate(`/problem/${newproblemId}`)
    }

    const triggerConfetti = () => {
        confetti({
            particleCount: 80,
            spread: 250,
            origin: {x:0.2, y: 0.6}
        });
        confetti({
            particleCount: 80,
            spread: 250,
            origin: {x:0.8, y:0.6}
        });
    }

    const normalizeOutput = (output) => {
        return output
            .trim()
            .split('\n')
            .map(line => {
                // Remove all spaces from inside brackets/arrays and normalize quotes
                line = line.trim();
                // Normalize spacing in arrays: [ 0, 1 ] -> [0,1]
                line = line.replace(/\[\s*/g, '[').replace(/\s*\]/g, ']').replace(/,\s+/g, ',').replace(/\s+,/g, ',');
                // Normalize quotes in arrays: ['x', 'y'] -> [x, y] for comparison
                line = line.replace(/'/g, '');
                line = line.replace(/"/g, '');
                return line;
            })
            .filter(line => line.length > 0)
            .join('\n');
    }

    const checkIfTestsPassed = (actualOutPut,expectedOutput) => {
        const normActualOutput = normalizeOutput(actualOutPut);
        const normExpectedOutput = normalizeOutput(expectedOutput);

        return normActualOutput === normExpectedOutput;
    }

    const handleRunCode = async () => {
        setIsRunning(true);
        setOutPut(null);
        const result = await executeCode(selectedLanguage, code);
        setIsRunning(false);
        setOutPut(result);
        
        if(result.success){
            const expectedOutput = currentProblem.expectedOutput[selectedLanguage];
            const testsPassed = checkIfTestsPassed(result.output, expectedOutput);
            if(testsPassed){
                triggerConfetti();
                toast.success("All test cases passed! 🎉");
            }else{
                toast.error("Code execution failed ❌");
            }
        }
    }

    return (
        <div className='h-screen bg-base-100 flex flex-col'>
            <Navbar />
            <div className='flex-1'>
                <PanelGroup direction='horizontal'>
                    {/* left panel- problem desc */}
                    <Panel defaultSize={40} minSize={30}>
                        <ProblemDescription
                         problem={currentProblem}
                         currentProblemId={currentProblemId}
                         onProblemChange={handleProblemChange}
                         allProblems={Object.values(PROBLEMS)}
                         />
                    </Panel>
                    <PanelResizeHandle className='w-2 bg-base-200 hover:bg-primary transition-colors cursor-col-resize' />
                    {/* right panel code editor */}
                    <Panel defaultSize={60} minSize={30}>
                        <PanelGroup direction='vertical'>
                            <Panel defaultSize={70} minSize={30}>
                                <CodeEditor
                                 selectedLanguage = {selectedLanguage}
                                 code={code}
                                 isRunning = {isRunning}
                                 onLanguageChange = {handledLanguageChange}
                                 onCodeChange = {setCode}
                                 onRunCode = {handleRunCode}
                                 />
                            </Panel>
                            <PanelResizeHandle className='h-2 bg-base-200 hover:bg-primary transition-colors cursor-col-resize' />
                            <Panel defaultSize={30} minSize={30}>
                                <OutPutPanel output={output}  />
                            </Panel>
                        </PanelGroup>
                    </Panel>
                </PanelGroup>
            </div>
        </div>
    )
}

export default ProblemPage