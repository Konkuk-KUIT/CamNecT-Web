import { AdminFullLayout } from "../../layouts/AdminFullLayout";
import { MainHeader } from "../../layouts/headers/MainHeader";

export const AdminActivityRegistrationPage = () => {
    return (
        <AdminFullLayout headerSlot={<MainHeader title="대외활동 등록" />}>
            <div className="flex flex-col h-full bg-white px-5 pt-4">
                <h1 className="text-sb-20 text-gray-900">대외활동 등록 페이지</h1>
                <p className="mt-2 text-m-14 text-gray-650">여기에 대외활동 등록 폼을 구현해 주세요.</p>
            </div>
        </AdminFullLayout>
    );
};