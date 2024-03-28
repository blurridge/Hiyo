import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import hiyoLogo from "../../../public/hiyo_logo.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const AttendanceCard = () => {
  return (
    <Tabs defaultValue="attendance" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="attendance">Attendance</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <TabsContent value="attendance">
        <Card>
          <CardHeader>
            <Image priority src={hiyoLogo} alt="Hiyo Logo" width={500} />
          </CardHeader>
          <CardContent>
            <p>Attendance</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <Image priority src={hiyoLogo} alt="Hiyo Logo" width={500} />
          </CardHeader>
          <CardContent>
            <p>Register</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
