import { ButtonDefault, ButtonPrimary } from "@components/buttons"
import { Flex, Form, Modal, ModalProps } from "antd"
import { Store } from "antd/es/form/interface"
import { FormProps } from "react-router-dom"

export const FormModal = (props: FormProps & Omit<ModalProps, "onFinish"> & {
    initialValues?: Store,
    onClose?: (e: React.MouseEvent | React.KeyboardEvent) => void,
    onFinish: (values: any) => void,
}) => {

    const { name, title, open, loading, initialValues, children, onClose, onFinish } = props

    return (
        <Modal
            title={<div className="fs-4 fw-lighter">{title}</div>}
            centered
            open={open}
            closable={false}
            onCancel={onClose}
            getContainer={false}
            footer={
                <Flex justify="space-between">
                    <ButtonDefault key="1" htmlType="button" onClick={onClose}>Cerrar</ButtonDefault>
                    <ButtonPrimary key="2" shape="round" type="primary" htmlType="submit" form={name} loading={loading}>Guardar</ButtonPrimary>
                </Flex>
            }
            styles={{
                header: {
                    paddingLeft: 10,
                    paddingRight: 10,
                    borderBottom: '1px solid #dddddd',
                }
            }}>
            <Form
                name={name}
                layout="vertical"
                autoComplete="off"
                size="large"
                initialValues={initialValues}
                onFinish={onFinish}>
                {children}
            </Form>
        </Modal>
    )
}
