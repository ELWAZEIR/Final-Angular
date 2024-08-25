import { state } from "@angular/animations";
import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../auth.service";

export const userGuard:CanActivateFn=
(route,state)=>{
//    return true 
    const authServ=inject(AuthService)
    // const authServ1=inject(AuthService)
    const router=inject(Router) 
//authServ. 
    if(authServ.isUserLogged){
    return true
    } else{
        alert('plz login') 
        router.navigateByUrl('/login')
        return false   
}


}