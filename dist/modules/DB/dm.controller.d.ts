import { SeedingService } from './seeding.service';
export declare class DbController {
    private readonly seedingService;
    constructor(seedingService: SeedingService);
    seedig(count: number): Promise<{
        msg: string;
    }>;
    clear(): Promise<void>;
}
