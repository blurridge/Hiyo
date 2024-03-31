import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import hiyoLogo from "../../../../public/hiyo_logo.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./LoginForm";

export const LoginCard = () => {
  return (
    <Tabs defaultValue="login" className="w-[400px] flex flex-col gap-2">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Apply as Admin</TabsTrigger>
      </TabsList>
      <Card>
        <CardHeader className="flex items-center justify-center">
          <Image priority src={hiyoLogo} alt="Hiyo Logo" width={200} />
        </CardHeader>
        <TabsContent value="login">
          <CardContent>
            <LoginForm />
          </CardContent>
        </TabsContent>
        <TabsContent value="register">
          <CardContent></CardContent>
        </TabsContent>
      </Card>
    </Tabs>
  );
};
