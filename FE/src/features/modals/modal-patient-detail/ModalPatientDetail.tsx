import { Modal, Descriptions, Spin, Empty, Row, Col } from "antd";
import { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client/react";
import type { TApiResult } from "../../../services/types";
import type { IPatient } from "../../../services/apis/patients/type-common";
import { PatientDetailApi } from "../../../services/apis/patients/detail/detail-patient.svc";

type Props = {
    open: boolean;
    patientId: string | null;
    onClose: () => void;
};

const ModalPatientDetail = ({ open, patientId, onClose }: Props) => {

    console.log("patientID: ", patientId);

    const client = useApolloClient();
    const [loading, setLoading] = useState(false);
    const [patient, setPatient] = useState<DeepPartial<IPatient> | null>(null);

    useEffect(() => {
        if (!open || patientId == null) return;

        const detailApi = new PatientDetailApi(client);

        const observer = {
            update: (result: TApiResult<IPatient | null>) => {
                setLoading(result.status === "loading");
                if (result.status === "success") {
                    setPatient((result.data as DeepPartial<IPatient>) ?? null);
                }
            },
        };

        detailApi.attach(observer);
        detailApi.execute({ patientId: patientId }).catch(() => { });

        return () => {
            detailApi.detach(observer);
        };
    }, [client, patientId]);

    console.log("patient: ", patient);
    return (
        <Modal open={open} title="Patient Detail" onCancel={onClose} footer={null} width={1000}>
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
    );
};

export default ModalPatientDetail;


