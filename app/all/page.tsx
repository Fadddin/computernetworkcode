'use client';

import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

export default function DownloadAll() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const downloadFiles = async () => {
      try {
        const response = await fetch('/api/files');
        const files = await response.json();
        
        if (!Array.isArray(files)) {
          throw new Error('Invalid response format');
        }

        if (files.length === 0) {
          setError('No files available for download');
          return;
        }
        
        files.forEach((file: string) => {
          const link = document.createElement('a');
          link.href = `/${file}`;
          link.download = file;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
      } catch (error) {
        console.error('Error downloading files:', error);
        setError('Failed to download files. Please try again later.');
      }
    };

    downloadFiles();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        {error ? (
          <>
            <Download className="w-16 h-16 mx-auto text-muted-foreground" />
            <h1 className="text-2xl font-bold text-foreground">Download Error</h1>
            <p className="text-muted-foreground">{error}</p>
          </>
        ) : (
          <>
            <Download className="w-16 h-16 mx-auto text-primary animate-bounce" />
            <h1 className="text-2xl font-bold text-foreground">Downloading all files...</h1>
            <p className="text-muted-foreground">
              Your downloads should begin automatically. Please check your downloads folder.
            </p>
          </>
        )}
      </div>
    </div>
  );
}