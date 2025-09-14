import { Modal, Descriptions, Spin, Empty, Row, Col, Button } from "antd";
import {  useState } from "react";
import type { IPatient } from "../../../services/apis/patients/type-common";
import { EyeOutlined } from "@ant-design/icons";
import { useDetailPatient } from "../../../hooks/patients/useDetailPatient";
import './style.scss'

interface TModalPatientDetailProps extends React.ComponentProps<typeof Modal> {
    patientId: string | null;
};

const ModalPatientDetail = ({  patientId ,...props}: TModalPatientDetailProps) => {
    const [loading, setLoading] = useState(false);

    const [openDetail, setOpenDetail] = useState(false);
    const [patient, setPatient] = useState<DeepPartial<IPatient> | null>(null);

    const { detailPatient } = useDetailPatient();

    const onOpenDetail = () => {
        setOpenDetail(true);

        if (!patientId) return;

        detailPatient({ patientId }, (result) => {
            setLoading(result.status === "loading");
            if (result.status === "success") {
                setPatient(result?.data || null);
            } else if (result.status === "error") {
                console.error("Error fetching patient detail:", result?.message);
            }
        });
    }

    const onCloseDetail = () => {
        setOpenDetail(false);
    }

    return (
        <>
        <Button icon ={<EyeOutlined />} onClick={onOpenDetail}/>

        <Modal 
            open={openDetail} 
            title="Patient Detail" 
            onCancel={onCloseDetail} 
            footer={null} 
            width={1000}
            className="modal-patient-detail"
            {...props}
        >
            {loading ? (
                <Spin />
            ) : !patient ? (
                <Empty description="No data" />
            ) : (
                <Row gutter={16}>
                    <Col span={12}>
                        <Descriptions bordered column={1} size="middle" title="Patient">
                            <Descriptions.Item label="ID">{patient.id}</Descriptions.Item>
                            <Descriptions.Item label="Email">{patient.email}</Descriptions.Item>
                            <Descriptions.Item label="Phone">{patient.phone}</Descriptions.Item>
                            <Descriptions.Item label="Gender">{patient.gender}</Descriptions.Item>
                            <Descriptions.Item label="DOB">{patient.dob}</Descriptions.Item>
                            <Descriptions.Item label="Address">{patient.addressInfo?.address}</Descriptions.Item>
                            <Descriptions.Item label="City">{patient.addressInfo?.city}</Descriptions.Item>
                            <Descriptions.Item label="State">{patient.addressInfo?.state}</Descriptions.Item>
                            <Descriptions.Item label="Country">{patient.addressInfo?.country}</Descriptions.Item>
                        </Descriptions>
                    </Col>
                    <Col span={12}>
                        <Descriptions bordered column={1} size="middle" title="Physician">
                            <Descriptions.Item label="ID">{patient.physician?.id}</Descriptions.Item>
                            <Descriptions.Item label="Email">{patient.physician?.email}</Descriptions.Item>
                            <Descriptions.Item label="Title">{patient.physician?.title}</Descriptions.Item>
                            <Descriptions.Item label="Phone">{patient.physician?.phone}</Descriptions.Item>
                            <Descriptions.Item label="Gender">{patient.physician?.gender}</Descriptions.Item>
                            <Descriptions.Item label="DOB">{patient.physician?.dob}</Descriptions.Item>
                        </Descriptions>
                    </Col>
                </Row>
            )}
        </Modal>
    </>
    );
};

export default ModalPatientDetail;

