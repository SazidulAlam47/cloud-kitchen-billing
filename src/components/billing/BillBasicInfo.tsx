import UInput from '../form/UInput';

interface BillBasicInfoProps {
    type: 'corporate' | 'event';
}

const BillBasicInfo = ({ type }: BillBasicInfoProps) => {
    const isCorporate = type === 'corporate';

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <UInput 
                name={isCorporate ? "corporateName" : "eventName"} 
                label={isCorporate ? "Corporate Name" : "Event Name"} 
            />
            <UInput name="contactPerson" label="Contact Person" />
            <UInput name="contactNo" label="Contact No" />
            <UInput name="date" label={isCorporate ? "Billing Date" : "Event Date"} type="date" />
        </div>
    );
};

export default BillBasicInfo;
