describe('Strict FCFS Queue Logic', () => {
  interface MockJob {
    id: string;
    createdAt: Date;
    paid: boolean;
    status: string;
    pageCount: number;
  }

  function computeQueuePosition(jobId: string, allJobs: MockJob[]): { position: number; aheadCount: number } | null {
    const target = allJobs.find((j) => j.id === jobId);
    if (!target || !['QUEUED', 'PRINTING'].includes(target.status) || !target.paid) {
      return null;
    }

    const ahead = allJobs.filter(
      (j) =>
        ['QUEUED', 'PRINTING'].includes(j.status) &&
        j.paid &&
        j.createdAt.getTime() < target.createdAt.getTime()
    );

    return {
      position: ahead.length + 1,
      aheadCount: ahead.length,
    };
  }

  function estimateWaitMinutes(position: number, avgPages: number = 10, secondsPerPage: number = 3): number {
    const totalSeconds = position * avgPages * secondsPerPage;
    return Math.max(1, Math.ceil(totalSeconds / 60));
  }

  const job1: MockJob = {
    id: 'job-1',
    createdAt: new Date('2026-09-17T10:00:00Z'),
    paid: true,
    status: 'PRINTING',
    pageCount: 10,
  };

  const job2: MockJob = {
    id: 'job-2',
    createdAt: new Date('2026-09-17T10:05:00Z'),
    paid: true,
    status: 'QUEUED',
    pageCount: 5,
  };

  const job3Unpaid: MockJob = {
    id: 'job-3',
    createdAt: new Date('2026-09-17T10:02:00Z'), // Created earlier, but UNPAID
    paid: false,
    status: 'PRICED',
    pageCount: 20,
  };

  const job4: MockJob = {
    id: 'job-4',
    createdAt: new Date('2026-09-17T10:10:00Z'),
    paid: true,
    status: 'QUEUED',
    pageCount: 15,
  };

  const jobsList = [job1, job2, job3Unpaid, job4];

  test('job 1 (earliest paid) is at position #1', () => {
    const res = computeQueuePosition('job-1', jobsList);
    expect(res).not.toBeNull();
    expect(res?.position).toBe(1);
    expect(res?.aheadCount).toBe(0);
  });

  test('job 2 is at position #2 (ignoring earlier unpaid job 3)', () => {
    const res = computeQueuePosition('job-2', jobsList);
    expect(res).not.toBeNull();
    expect(res?.position).toBe(2);
    expect(res?.aheadCount).toBe(1);
  });

  test('unpaid job cannot enter queue', () => {
    const res = computeQueuePosition('job-3', jobsList);
    expect(res).toBeNull();
  });

  test('job 4 is at position #3', () => {
    const res = computeQueuePosition('job-4', jobsList);
    expect(res).not.toBeNull();
    expect(res?.position).toBe(3);
    expect(res?.aheadCount).toBe(2);
  });

  test('positions shift forward when leading job completes', () => {
    const updatedJobs = jobsList.map((j) => (j.id === 'job-1' ? { ...j, status: 'COMPLETED' } : j));
    const resJob2 = computeQueuePosition('job-2', updatedJobs);
    const resJob4 = computeQueuePosition('job-4', updatedJobs);

    expect(resJob2?.position).toBe(1); // Shifted to front
    expect(resJob4?.position).toBe(2); // Shifted forward
  });

  test('calculates wait time estimation based on queue position', () => {
    // Position 1: 1 * 10 * 3 = 30s -> ceil(30/60) = 1 min
    expect(estimateWaitMinutes(1, 10, 3)).toBe(1);

    // Position 4: 4 * 10 * 3 = 120s -> 2 min
    expect(estimateWaitMinutes(4, 10, 3)).toBe(2);

    // Position 10: 10 * 10 * 3 = 300s -> 5 min
    expect(estimateWaitMinutes(10, 10, 3)).toBe(5);
  });
});
