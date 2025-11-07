
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileUp, Sheet, FileText, X, Sparkles } from 'lucide-react';
import React, { useState, useRef } from 'react';
import { generateSlidesAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import type { Slide } from './presentation-viewer';
import mammoth from 'mammoth';

interface DocumentConverterProps {
    setSlides: React.Dispatch<React.SetStateAction<Slide[]>>;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DocumentConverter({ setSlides, setIsLoading }: DocumentConverterProps) {
    const [dragging, setDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const { toast } = useToast();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            setSlides([]);
        }
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (!file) setDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (!file) setDragging(true);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFile(e.dataTransfer.files[0]);
            setSlides([]);
            e.dataTransfer.clearData();
        }
    };

    const handleClearFile = () => {
        setFile(null);
        setSlides([]);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };
    
    const handleChooseFileClick = () => {
        if (!file) {
            fileInputRef.current?.click();
        }
    };

    const processAndGenerateSlides = async (content: string) => {
        const result = await generateSlidesAction({ documentContent: content });

        if (result.slides) {
            setSlides(result.slides);
        } else {
            toast({
                variant: 'destructive',
                title: 'Generation Failed',
                description: result.error || 'An unknown error occurred.',
            });
        }
        setIsLoading(false);
        setIsProcessing(false);
    };

    const handleGenerate = async () => {
        if (!file) return;

        setIsLoading(true);
        setIsProcessing(true);
        setSlides([]);

        const reader = new FileReader();

        if (file.name.endsWith('.docx')) {
            reader.onload = async (event) => {
                const arrayBuffer = event.target?.result as ArrayBuffer;
                try {
                    const result = await mammoth.extractRawText({ arrayBuffer });
                    await processAndGenerateSlides(result.value);
                } catch (error) {
                    console.error('Error processing .docx file:', error);
                    toast({
                        variant: 'destructive',
                        title: 'Error reading .docx file',
                        description: 'There was an issue extracting content from the Word document.',
                    });
                    setIsLoading(false);
                    setIsProcessing(false);
                }
            };
            reader.onerror = () => {
                toast({
                    variant: 'destructive',
                    title: 'Error reading file',
                    description: 'An error occurred while reading the file.',
                });
                setIsLoading(false);
                setIsProcessing(false);
            };
            reader.readAsArrayBuffer(file);
        } else {
            reader.onload = async (event) => {
                const fileContent = event.target?.result as string;
                if (fileContent === null) {
                    toast({
                        variant: 'destructive',
                        title: 'Error reading file',
                        description: 'Could not read the content of the uploaded file.',
                    });
                    setIsLoading(false);
                    setIsProcessing(false);
                    return;
                }
                await processAndGenerateSlides(fileContent);
            };
            reader.onerror = () => {
                toast({
                    variant: 'destructive',
                    title: 'Error reading file',
                    description: 'An error occurred while reading the file.',
                });
                setIsLoading(false);
                setIsProcessing(false);
            };
            reader.readAsText(file);
        }
    };

    return (
        <>
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-headline">Convert Your Documents</CardTitle>
                    <CardDescription>Upload a document or spreadsheet to magically convert it into a presentation.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div
                        onClick={handleChooseFileClick}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg transition-colors ${file ? 'border-primary bg-secondary' : 'cursor-pointer'} ${dragging ? 'border-primary bg-secondary' : 'border-border hover:border-primary'}`}
                    >
                        {file ? (
                            <div className="text-center">
                                <FileText className="w-10 h-10 mx-auto mb-4 text-primary" />
                                <p className="font-semibold">{file.name}</p>
                                <p className="text-sm text-muted-foreground">{Math.round(file.size / 1024)} KB</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                                <FileUp className="w-10 h-10 mb-4 text-muted-foreground" />
                                <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold text-primary">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-muted-foreground">DOCX, TXT, MD, CSV (MAX. 10MB)</p>
                            </div>
                        )}
                        <input
                            ref={fileInputRef}
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            accept=".docx,.txt,.md,.csv"
                            disabled={isProcessing}
                        />
                    </div>
                    <div className="mt-6 flex justify-center gap-4">
                        {file && (
                           <>
                            <Button variant="ghost" onClick={handleClearFile} disabled={isProcessing}>
                               <X className="mr-2 h-4 w-4" />
                               Clear
                           </Button>
                            <Button onClick={handleGenerate} disabled={isProcessing}>
                                <Sparkles className="mr-2 h-4 w-4" />
                                {isProcessing ? 'Generating...' : 'Generate Presentation'}
                           </Button>
                           </>
                        )}
                    </div>
                </CardContent>
            </Card>

            {(isProcessing) && (
                <div className="mt-8">
                    <h3 className="text-lg font-semibold text-center mb-4 font-headline">Supported Formats</h3>
                    <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
                        <Card>
                            <CardHeader className="flex flex-row items-center gap-4">
                                <div className="bg-secondary p-3 rounded-lg"><FileText className="w-6 h-6 text-primary" /></div>
                                <CardTitle className="text-lg">Word Docs</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">Converts headings, paragraphs, and lists from .docx files into distinct slides.</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center gap-4">
                                <div className="bg-secondary p-3 rounded-lg"><FileText className="w-6 h-6 text-primary" /></div>
                                <CardTitle className="text-lg">Text & Markdown</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">Converts headings, paragraphs, and lists from .txt or .md files into distinct slides.</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center gap-4">
                                <div className="bg-secondary p-3 rounded-lg"><Sheet className="w-6 h-6 text-primary" /></div>
                                <CardTitle className="text-lg">Spreadsheets</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">Generates individual slides from each row of data in your .csv files.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </>
    );
}
