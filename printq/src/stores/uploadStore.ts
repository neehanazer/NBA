import { create } from 'zustand';
import { CostBreakdown, Job } from '@/types';
import { calculateCost } from '@/lib/pricing';

export interface UploadState {
  currentStep: number;
  file: File | null;
  uploadedFileName: string;
  originalName: string;
  fileSize: number;
  jobId: string | null;
  pageCount: number;
  colorPages: number[];
  bwPages: number;
  duplex: boolean;
  copies: number;
  costBreakdown: CostBreakdown | null;
  paymentMethod: string;
  isProcessing: boolean;
  processingStep: string;
  processingProgress: number;
  queuePosition: number | null;
  estimatedMinutes: number | null;

  // Actions
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setFile: (file: File | null) => void;
  setProcessedFileInfo: (info: {
    jobId?: string;
    originalFile: string;
    originalName: string;
    fileSize: number;
    pageCount: number;
    colorPages: number[];
    bwPages: number;
  }) => void;
  setOptions: (options: { duplex?: boolean; copies?: number }) => void;
  setCostBreakdown: (breakdown: CostBreakdown) => void;
  setPaymentMethod: (method: string) => void;
  setProcessing: (isProcessing: boolean, step?: string, progress?: number) => void;
  setQueueResult: (position: number, minutes: number) => void;
  reset: () => void;
}

const initialState = {
  currentStep: 0,
  file: null,
  uploadedFileName: '',
  originalName: '',
  fileSize: 0,
  jobId: null,
  pageCount: 1,
  colorPages: [],
  bwPages: 1,
  duplex: false,
  copies: 1,
  costBreakdown: null,
  paymentMethod: 'online',
  isProcessing: false,
  processingStep: '',
  processingProgress: 0,
  queuePosition: null,
  estimatedMinutes: null,
};

export const useUploadStore = create<UploadState>((set, get) => ({
  ...initialState,

  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: Math.min(5, state.currentStep + 1) })),
  prevStep: () => set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),

  setFile: (file) =>
    set({
      file,
      originalName: file ? file.name : '',
      fileSize: file ? file.size : 0,
    }),

  setProcessedFileInfo: (info) => {
    const { duplex, copies } = get();
    const breakdown = calculateCost(info.pageCount, info.colorPages, duplex, copies);
    set({
      jobId: info.jobId || get().jobId,
      uploadedFileName: info.originalFile,
      originalName: info.originalName,
      fileSize: info.fileSize,
      pageCount: info.pageCount,
      colorPages: info.colorPages,
      bwPages: info.bwPages,
      costBreakdown: breakdown,
    });
  },

  setOptions: (options) => {
    const state = get();
    const duplex = options.duplex !== undefined ? options.duplex : state.duplex;
    const copies = options.copies !== undefined ? options.copies : state.copies;
    const breakdown = calculateCost(state.pageCount, state.colorPages, duplex, copies);

    set({
      duplex,
      copies,
      costBreakdown: breakdown,
    });
  },

  setCostBreakdown: (costBreakdown) => set({ costBreakdown }),
  setPaymentMethod: (paymentMethod) => set({ paymentMethod }),

  setProcessing: (isProcessing, step = '', progress = 0) =>
    set({ isProcessing, processingStep: step, processingProgress: progress }),

  setQueueResult: (queuePosition, estimatedMinutes) =>
    set({ queuePosition, estimatedMinutes }),

  reset: () => set(initialState),
}));
