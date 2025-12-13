/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useImperativeHandle } from 'react';
import type { ReactNode, RefObject } from 'react';
import {
    FormProvider,
    useForm,
} from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';

export type TUFromFncRef = {
    resetFrom: () => void;
};

type TFormConfig = {
    defaultValues?: Record<string, unknown>;
    resolver?: any;
    values?: Record<string, unknown>;
};

type UFromProps = {
    children: ReactNode;
    onSubmit: SubmitHandler<any>;
    fncRef?: RefObject<unknown>;
} & TFormConfig;

const UFrom = ({
    children,
    onSubmit,
    defaultValues,
    resolver,
    fncRef = undefined,
    values,
}: UFromProps) => {
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

    const resetFrom = () => {
        methods.reset();
    };

    useImperativeHandle(fncRef, () => ({
        resetFrom,
    }));

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
                {children}
            </form>
        </FormProvider>
    );
};

export default UFrom;
