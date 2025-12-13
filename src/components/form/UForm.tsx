/* eslint-disable @typescript-eslint/no-explicit-any */
import { useImperativeHandle } from 'react';
import type { ReactNode, RefObject } from 'react';
import {
    FormProvider,
    useForm,
} from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';

export type TUFormFncRef = {
    resetForm: () => void;
};

type TFormConfig = {
    defaultValues?: Record<string, unknown>;
    resolver?: any;
    values?: Record<string, unknown>;
};

type UFormProps = {
    children: ReactNode;
    onSubmit: SubmitHandler<any>;
    fncRef?: RefObject<unknown>;
} & TFormConfig;

const UForm = ({
    children,
    onSubmit,
    defaultValues,
    resolver,
    fncRef = undefined,
    values,
}: UFormProps) => {
    const formConfig: TFormConfig = {};

    if (defaultValues) {
        formConfig.defaultValues = defaultValues;
    }
    if (resolver) {
        formConfig.resolver = resolver;
    }
    if (values) {
        formConfig.values = values;
    }

    const methods = useForm(formConfig);

    const resetForm = () => {
        methods.reset();
    };

    useImperativeHandle(fncRef, () => ({
        resetForm,
    }));

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
                {children}
            </form>
        </FormProvider>
    );
};

export default UForm;
