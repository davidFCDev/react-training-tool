import { Avatar } from "@heroui/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { toast } from "sonner";

import authService from "@/app/service/auth.service";

const ProfileDropdown = () => {
  const handleLogout = async () => {
    const success = await authService.logout();

    if (success) {
      toast.success("Sesión cerrada correctamente.");
    } else {
      toast.error("Error al cerrar sesión.");
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <button>
          <Avatar
            isBordered
            color="success"
            size="sm"
            src="https://i.pravatar.cc/150?u=a04258114e29026302d"
          />
        </button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="profile">Profile</DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          onPress={handleLogout}
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ProfileDropdown;
