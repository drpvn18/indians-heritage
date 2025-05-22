import React from "react";
import styles from "./../../styles/information/PrivacyPolicy.module.css"
import Link from "next/link";

const privacyPolicyContent = [
    {
        bolckTitle: "Return policy",
        content: [
            {
                type: "text",
                content: "Customer satisfaction is our priority but due to the perishable nature of the products we offer, we generally do not accept returns or exchanges. If you are unhappy with the quality of the delivered product, we encourage you to contact us immediately."
            }
        ]
    },
    {
        bolckTitle: "Quality Concerns and Refunds",
        content: [
            {
                type: "text",
                content: "If you are dissatisfied with the condition/quality of a delivered product, please notify us within 2 days of receiving your order. We may request additional information, including photographic evidence of the product in question. Based on the nature of the concern, we will assess the situation and, at our discretion, provide a refund for the affected item."
            }
        ]
    },
    {
        bolckTitle: "Refund Process",
        content: [
            {
                type: "list-item",
                content: "To initiate a refund request, please contact our customer support team at indianheritage.eu@gmail.com"
            },
            {
                type: "list-item",
                content: "Provide your order number, a clear description of the quality issue, and any relevant supporting documentation or images."
            },
            {
                type: "list-item",
                content: "Our customer support team will guide you through the process and inform you of the next steps."
            }
        ]
    },
    {
        bolckTitle: "Refund Amount",
        content: [
            {
                type: "list-item",
                content: "For orders that were not received or collected, the refund will be processed to the original payment account."
            },
            {
                type: "list-item",
                content: "For orders that were received but not collected, the refund will be processed to the original payment account."
            }
        ]
    },
    {
        bolckTitle: "Refund Timeline",
        content: [
            {
                type: "text",
                content: "Refunds will be processed within 5 business days from the date of approval. Please note that the actual time it takes for the refund to be reflected in your account may vary depending on your payment provider."
            }
        ]
    },
    {
        bolckTitle: "Contact Information",
        content: [
            {
                type: "text",
                content: "If you have any questions or concerns regarding our refund policy, please contact us at indianheritage.eu@gmail.com. We are committed to ensuring your satisfaction and will do our best to address any issues promptly."
            }
        ]
    },
    {
        bolckTitle: "Please Note:",
        content: [
            {
                type: "list-item",
                content: "Refund eligibility is determined on a case-by-case basis.",
            },
            {
                type: "list-item",
                content: "indianheritage.eu reserves the right to update or modify this refund policy at any time without prior notice.Please review this policy periodically for any changes.",
            }
        ]
    },
    {
        bolckTitle: "",
        content: [
            {
                type: "text",
                content: "By placing an order with indianheritage.eu, you acknowledge and agree to abide by this refund policy."
            }
        ]
    }
]


export default function PrivacyPolicy() {
    return (
        <div className={styles.container} >
            <div className={styles.privacy_policy}>
                <div className={styles.privacy_policy_content}>
                    <div className={styles.pageTitle}>Refund/Return Policy</div>
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
                                                                        <Link href={resource} key={i} className="text-blue-500 ml-[10px]" target="_blank" rel="noreferrer">
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