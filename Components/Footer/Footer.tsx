import React, { memo, FC } from "react"

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
    return (
        <footer className="p-4 footer bg-base-300 text-base-content footer-center">
            <div>
                <p>Copyright © 2021 - All right reserved by ACME Industries Ltd</p>
            </div>
        </footer>
    )
}

export default memo(Footer)
