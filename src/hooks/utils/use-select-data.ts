import {
    districtsMock,
    electoralSectionsMock,
    sectionsMock,
    municipalitiesMock,
    establishmentsMock,
    circuitsMock,
    tables,
} from "#/mocks/_mocks";


export const useSelectData = () => {
    
    return {
        districts: districtsMock,
        electoralSections: electoralSectionsMock,
        sections: sectionsMock,
        municipalities: municipalitiesMock,
        establishments: establishmentsMock,
        circuits: circuitsMock,
        tables: tables,
    };
}