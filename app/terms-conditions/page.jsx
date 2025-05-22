import React from "react";
import styles from "./../../styles/information/PrivacyPolicy.module.css"
import Link from "next/link";

const privacyPolicyContent = [
    {
        bolckTitle: "Introduction",
        content: [
            {
                type: "text",
                content: "Welcome to indianheritage.eu. These terms and conditions outline the rules and regulations for the use of our website."
            },
            {
                type: "text",
                content: "By accessing this website, we assume you accept these terms and conditions. Do not continue to use indianheritage.eu if you do not agree to all of the terms and conditions stated on this page."
            }
        ]
    },
    {
        bolckTitle: " The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and any or all Agreements: “Client,” “You,” and “Your” refers to you, the person accessing this website and accepting the Company's terms and conditions. “The Company,” “Ourselves,” “We,” “Our,” and “Us,” refers to our Company.",
        content: []
    },
    {
        bolckTitle: "Purchases",
        content: [
            {
                type: "list-item",
                content: "By placing an order through indianheritage.eu, you are confirming that you are legally capable of entering into binding contracts."
            },
            {
                type: "list-item",
                content: "We reserve the right to refuse or cancel any order at our discretion for any reason, including but not limited to product availability, errors in the description or price of the product, or payment issues."
            }
        ]
    },
    {
        bolckTitle: "Pricing and Payment",
        content: [
            {
                type: "list-item",
                content: "Prices for products are subject to change without notice."
            },
            {
                type: "list-item",
                content: "We reserve the right to refuse or cancel orders if products are listed at an incorrect price."
            },
            {
                type: "list-item",
                content: "Payment must be received in full before order dispatch."
            }
        ]
    },
    {
        bolckTitle: "Shipping and Delivery",
        content: [
            {
                type: "list-item",
                content: "Delivery times may vary and are estimates only."
            },
            {
                type: "list-item",
                content: "We are not responsible for any delays or issues once the product has been dispatched."
            }
        ]
    },
    {
        bolckTitle: "Returns and Refunds",
        content: [
            {
                type: "list-item",
                content: "Please refer to our Return Policy for information on returns and refunds."
            }
        ]
    },
    {
        bolckTitle: "Privacy Policy",
        content: [
            {
                type: "list-item",
                content: "Our Privacy Policy outlines how we collect, use, and protect your personal information."
            }
        ]
    },
    {
        bolckTitle: "Intellectual Property",
        content: [
            {
                type: "list-item",
                content: "The content on this website, including but not limited to text, graphics, logos, and images, is the property of indianheritage.eu and is protected by copyright laws."
            }
        ]
    },
    {
        bolckTitle: "Limitation of Liability",
        content: [
            {
                type: "list-item",
                content: "We will not be liable for any indirect, special, or consequential damages, or any loss of revenue, profits, or data arising in connection with your use of indianheritage.eu."
            }
        ]
    },
    {
        bolckTitle: "Governing Law",
        content: [
            {
                type: "list-item",
                content: "These terms and conditions are governed by and construed in accordance with the laws of Luxembourg."
            }
        ]
    },
    {
        bolckTitle: "Changes to Terms and Conditions",
        content: [
            {
                type: "list-item",
                content: "We reserve the right to revise these terms and conditions at any time without notice. By using this website, you agree to be bound by the current version of these terms and conditions."
            }
        ]
    },
    {
        bolckTitle: "Contact Information:",
        content: [
            {
                type: "text",
                content: "If you have any questions or concerns about these terms and conditions, please contact us at -",
                external_resources: ["info@indianheritage.eu"]
            },
            {
                type: "text",
                content: "By using indianheritage.eu, you signify your acceptance of these terms.If you do not agree to these terms, please do not use our website."
            },
            {
                type: "text",
                content: "This template is a general guide and may need to be adapted to suit the specific circumstances of your business and the legal requirements in your jurisdiction.It's strongly recommended to consult with a legal professional to ensure that your terms and conditions comply with all applicable laws."
            }
        ]
    }
]

export default function PrivacyPolicy() {
    return (
        <div className={styles.container} >
            <div className={styles.privacy_policy}>
                <div className={styles.privacy_policy_content}>
                    <div className={styles.pageTitle}>Terms & Conditions</div>
                    <div>
                        {
                            privacyPolicyContent?.map((block, index) => {
                                return (
                                    <div key={index}>
                                        <div className="text-xl font-medium my-6">{block?.bolckTitle && (`${index + 1}. `)}{block?.bolckTitle}</div>
                                        <ul>
                                            {
                                                block?.content?.map((sub_item, ind) => {
                                                    return (
                                                        <li key={ind} className={`my-4 ${sub_item?.type === "list-item" ? 'list-disc ml-10' : 'list-none'}`}>
                                                            {sub_item?.content}
                                                            {
                                                                sub_item?.external_resources?.map((resource, i) => {
                                                                    return (
                                                                        <Link href={resource} key={i} className="text-blue-500 ml-[5px]" target="_blank" rel="noreferrer">
                                                                            {resource}
                                                                        </Link>
                                                                    );
                                                                })
                                                            }
                                                        </li>
                                                    );
                                                })
                                            }

                                        </ul>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </div >
    );
}