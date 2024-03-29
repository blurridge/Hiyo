import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import hiyoLogo from "../../../public/hiyo_logo.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AttendanceForm } from "./AttendanceForm";
import { RegistrationForm } from "./RegistrationForm";

export const AttendanceCard = () => {
  return (
    <Tabs defaultValue="attendance" className="w-[400px] flex flex-col gap-2">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="attendance">Attendance</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <Card>
        <CardHeader className="flex items-center justify-center">
          <Image priority src={hiyoLogo} alt="Hiyo Logo" width={200} />
        </CardHeader>
        <TabsContent value="attendance">
          <CardContent>
            <AttendanceForm />
          </CardContent>
        </TabsContent>
        <TabsContent value="register">
          <CardContent>
            <RegistrationForm />
          </CardContent>
        </TabsContent>
      </Card>
    </Tabs>
  );
};
