
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  User,
  Mail,
  BadgeCheck,
  ShoppingCart,
} from "lucide-react"
import { useUser } from "@/context/UserContext"
import { getUserOrders } from "@/services/order"
import { IOrderResponse, IUser } from "@/types"

const UserProfile =  async({user,orders}:{user:IUser, orders:IOrderResponse[]}) => {

  return (
    <div className="w-full px-4 py-6">
      <Card className="max-w-2xl mx-auto shadow-xl border-none rounded-2xl bg-gradient-to-br from-white via-slate-50 to-slate-100">
        <CardHeader className="flex items-center flex-col space-y-4">
          <Avatar className="w-20 h-20 border shadow">
            <AvatarImage  alt={user?.name} />
            <AvatarFallback className="bg-blue-100 text-blue-800">
              {"@Me"}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl font-bold text-slate-800">
            {user?.name.toUpperCase()}
          </CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-base px-4 pb-6">
          <InfoItem icon={<BadgeCheck size={18} />} label="Role" value={user?.role} />
          <InfoItem icon={<Mail size={18} />} label="Email" value={user?.email} />
          <InfoItem icon={<ShoppingCart size={18} />} label="Total Orders" value={orders?.length} />
        </CardContent>
      </Card>
    </div>
  )
}

export default UserProfile

const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string | number | undefined
}) => (
  <div className="flex items-start space-x-3">
    <div className="text-blue-600 mt-1">{icon}</div>
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-base font-medium text-slate-800 break-words">
        {value || "—"}
      </p>
    </div>
  </div>
)
