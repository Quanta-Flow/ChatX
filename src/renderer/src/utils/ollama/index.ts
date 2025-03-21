import { OLLAMA_HOST } from '@renderer/config/path';
import { Ollama } from 'ollama';

export const ollama = new Ollama({ host: OLLAMA_HOST });
