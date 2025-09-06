export interface Planet {
    id: string;
    planetName: string;
    planetColor: string;
    planetRadiusKM: number;
    distInMillionsKM: {
        fromSun: number;
        fromEarth: number;
    };
    description: string;
    imageUrl: string;
    imageName: string;
}