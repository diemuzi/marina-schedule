<template>
    <CDropdown add-menu-classes="pt-0"
               class="c-header-nav-items"
               inNav
               placement="bottom-end">
        <template #toggler>
            <CHeaderNavLink>
                <div class="c-avatar">
                    <img alt="Avatar"
                         class="c-avatar-img"
                         src="img/6.jpg"/>
                </div>
            </CHeaderNavLink>
        </template>

        <CDropdownHeader class="text-center"
                         color="light"
                         tag="div">
            <strong>Account</strong>
        </CDropdownHeader>

        <CDropdownItem :to="{ name: 'employee:account:profile' }">
            <CIcon name="cil-user"/>
            Profile
        </CDropdownItem>

        <CDropdownItem :to="{ name: 'employee:account:password' }">
            <CIcon name="cil-lock-locked"/>
            Change Password
        </CDropdownItem>

        <CDropdownDivider/>

        <CDropdownItem :to="{ name: 'logout' }">
            <CIcon name="cil-account-logout"/>
            Logout
        </CDropdownItem>
    </CDropdown>
</template>

<script>
export default {
    name: 'TheHeaderDropdownAccnt'
};
</script>

<style scoped>
.c-icon {
    margin-right: 0.3rem;
}
</style>