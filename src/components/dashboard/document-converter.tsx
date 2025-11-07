'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileUp, Sheet, FileText, X } from 'lucide-react';
import React, { useState, useRef } from 'react';

export function DocumentConverter() {
    const [dragging, setDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFile(e.dataTransfer.files[0]);
            e.dataTransfer.clearData();
        }
    };

    const handleClearFile = () => {
        setFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };
    
    const handleChooseFileClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="max-w-4xl mx-auto">
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
                        className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg transition-colors cursor-pointer ${dragging ? 'border-primary bg-secondary' : 'border-border hover:border-primary'}`}
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
                                <p className="text-xs text-muted-foreground">DOCX, CSV, XLSX (MAX. 10MB)</p>
                            </div>
                        )}
                        <input
                            ref={fileInputRef}
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            accept=".docx,.csv,.xlsx"
                        />
                    </div>
                    <div className="mt-6 flex justify-center gap-4">
                        <Button onClick={handleChooseFileClick}>
                            Choose File
                        </Button>
                        {file && (
                           <Button variant="ghost" onClick={handleClearFile}>
                               <X className="mr-2 h-4 w-4" />
                               Clear
                           </Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            <div className="mt-8">
                <h3 className="text-lg font-semibold text-center mb-4 font-headline">Supported Formats</h3>
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-4">
                            <div className="bg-secondary p-3 rounded-lg"><FileText className="w-6 h-6 text-primary" /></div>
                            <CardTitle className="text-lg">Documents</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">Converts headings, paragraphs, and lists from .docx files into distinct slides.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-4">
                            <div className="bg-secondary p-3 rounded-lg"><Sheet className="w-6 h-6 text-primary" /></div>
                            <CardTitle className="text-lg">Spreadsheets</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">Generates individual slides from each row of data in your .csv or .xlsx files.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
