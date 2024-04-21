import React from 'react'
import Link from "next/link"
import { Button } from '@nextui-org/react'
function AuthRoute() {
  return (
   <>
    <div className="flex justify-center items-center gap-6">
        <Link href="/login">
          <Button variant="solid" color="primary">
            Login
          </Button>
        </Link>
        <Link href="/signup">
          <Button variant="solid" color="primary">
            Sign Up
          </Button>
        </Link>
      </div>
   </>
  )
}

export default AuthRoute