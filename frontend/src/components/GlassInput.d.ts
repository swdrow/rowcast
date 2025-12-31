import React from 'react';
interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}
export declare const GlassInput: React.FC<GlassInputProps>;
export {};
