
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { LogOut, User } from "lucide-react";

export function Header() {
  const { user, logoutMutation } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        toast({
          title: "Logged out",
          description: "You have been successfully logged out",
        });
      },
    });
  };

  return (
    <header className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/">
            <a className="text-3xl font-bold text-slate-900 flex items-center gap-2">
              <Car className="h-8 w-8" />
              Car Recognition
            </a>
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{user.username}</span>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout} className="text-slate-900 border-slate-900 hover:bg-slate-100">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/auth">
                <Button className="bg-slate-900 hover:bg-slate-800 text-white">Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
