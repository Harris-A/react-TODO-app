import React from "react";
import { FooterCopyright, FooterLink, FooterLinkGroup } from "flowbite-react";

const Footer = () => {
    return (
        <Footer container>
            <FooterCopyright href="#" by="Flowbite™" year={2022} />
            <FooterLinkGroup>
                <FooterLink href="#">About</FooterLink>
                <FooterLink href="#">Privacy Policy</FooterLink>
                <FooterLink href="#">Licensing</FooterLink>
                <FooterLink href="#">Contact</FooterLink>
            </FooterLinkGroup>
        </Footer>
    );
}

export default Footer;