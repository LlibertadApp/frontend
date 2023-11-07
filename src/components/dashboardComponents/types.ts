// Define interfaces for the component props
export interface DashboardStateProps {
    state: 'active' | 'inactive';
}

export interface DashboardAccordionProps {
data: {
    name: string;
    lastname: string;
    email: string;
    dni: string;
    phone: string;
    state: 'active' | 'inactive';
};
}
