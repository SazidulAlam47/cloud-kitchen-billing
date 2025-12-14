import UInput from '../form/UInput';

const CorporateBasicInfo = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <UInput name="corporateName" label="Corporate Name" />
            <UInput name="contactPerson" label="Contact Person" />
            <UInput name="contactNo" label="Contact No" />
            <UInput name="date" label="Billing Date" type="date" />
        </div>
    );
};

export default CorporateBasicInfo;
