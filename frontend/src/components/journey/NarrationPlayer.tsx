import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Loader2 } from 'lucide-react';
import { supabase } from '@/db/supabase';
import { toast } from 'sonner';

interface NarrationPlayerProps {
  text: string;
  voice?: string;
  className?: string;
}

export default function NarrationPlayer({ text, voice = 'heart', className }: NarrationPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const handlePlay = async () => {
    if (isPlaying && audio) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    if (audio && !audio.ended) {
      audio.play();
      setIsPlaying(true);
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: { text, voice },
      });

      if (error) {
        const errorMsg = await error?.context?.text?.();
        console.error('TTS error:', errorMsg || error?.message);
        toast.error('Failed to generate narration. Please try again.');
        setIsLoading(false);
        return;
      }

      if (data instanceof Blob) {
        const audioUrl = URL.createObjectURL(data);
        const newAudio = new Audio(audioUrl);

        newAudio.onended = () => {
          setIsPlaying(false);
        };

        newAudio.onerror = () => {
          toast.error('Failed to play audio. Please try again.');
          setIsPlaying(false);
        };

        setAudio(newAudio);
        await newAudio.play();
        setIsPlaying(true);
      } else {
        toast.error('Invalid audio response');
      }
    } catch (err) {
      console.error('Error playing narration:', err);
      toast.error('An error occurred while playing narration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePlay}
      disabled={isLoading}
      variant="outline"
      className={className}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </>
      ) : isPlaying ? (
        <>
          <Pause className="mr-2 h-4 w-4" />
          Pause Narration
        </>
      ) : (
        <>
          <Play className="mr-2 h-4 w-4" />
          Listen to Narration
        </>
      )}
    </Button>
  );
}
